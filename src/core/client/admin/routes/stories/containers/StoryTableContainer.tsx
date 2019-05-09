import React, { FunctionComponent, useState } from "react";
import { graphql, RelayPaginationProp } from "react-relay";

import { StoryTableContainer_query as QueryData } from "talk-admin/__generated__/StoryTableContainer_query.graphql";
import { StoryTableContainerPaginationQueryVariables } from "talk-admin/__generated__/StoryTableContainerPaginationQuery.graphql";
import { IntersectionProvider } from "talk-framework/lib/intersection";
import {
  useLoadMore,
  useRefetch,
  withPaginationContainer,
} from "talk-framework/lib/relay";
import { GQLSTORY_STATUS_RL } from "talk-framework/schema";

import { HorizontalGutter } from "talk-ui/components";
import StoryTable from "../components/StoryTable";
import StoryTableFilter from "../components/StoryTableFilter";

interface Props {
  initialSearchFilter?: string;
  query: QueryData | null;
  relay: RelayPaginationProp;
}

const StoryTableContainer: FunctionComponent<Props> = props => {
  const stories = props.query
    ? props.query.stories.edges.map(edge => edge.node)
    : [];

  const [loadMore, isLoadingMore] = useLoadMore(props.relay, 10);
  const [searchFilter, setSearchFilter] = useState<string>(
    props.initialSearchFilter || ""
  );
  const [statusFilter, setStatusFilter] = useState<GQLSTORY_STATUS_RL | null>(
    null
  );
  const [, isRefetching] = useRefetch<
    Pick<
      StoryTableContainerPaginationQueryVariables,
      "searchFilter" | "statusFilter"
    >
  >(props.relay, {
    searchFilter: searchFilter || null,
    statusFilter,
  });

  return (
    <IntersectionProvider>
      <HorizontalGutter size="double">
        <StoryTableFilter
          onSetStatusFilter={setStatusFilter}
          statusFilter={statusFilter}
          onSetSearchFilter={setSearchFilter}
          searchFilter={searchFilter}
        />
        <StoryTable
          viewer={props.query && props.query.viewer}
          loading={!props.query || isRefetching}
          stories={stories}
          onLoadMore={loadMore}
          hasMore={!isRefetching && props.relay.hasMore()}
          disableLoadMore={isLoadingMore}
          isSearching={Boolean(statusFilter) || Boolean(searchFilter)}
        />
      </HorizontalGutter>
    </IntersectionProvider>
  );
};

// TODO: (cvle) In this case they are the same, but they should be autogenerated.
type FragmentVariables = StoryTableContainerPaginationQueryVariables;

const enhanced = withPaginationContainer<
  Props,
  StoryTableContainerPaginationQueryVariables,
  FragmentVariables
>(
  {
    query: graphql`
      fragment StoryTableContainer_query on Query
        @argumentDefinitions(
          count: { type: "Int!", defaultValue: 10 }
          cursor: { type: "Cursor" }
          statusFilter: { type: "STORY_STATUS" }
          searchFilter: { type: "String" }
        ) {
        viewer {
          ...StoryRowContainer_viewer
        }
        stories(
          first: $count
          after: $cursor
          status: $statusFilter
          query: $searchFilter
        ) @connection(key: "StoryTable_stories") {
          edges {
            node {
              id
              ...StoryRowContainer_story
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.query && props.query.stories;
    },
    // This is also the default implementation of `getFragmentVariables` if it isn't provided.
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      };
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        count,
        cursor,
        statusFilter: fragmentVariables.statusFilter,
        searchFilter: fragmentVariables.searchFilter,
      };
    },
    query: graphql`
      # Pagination query to be fetched upon calling 'loadMore'.
      # Notice that we re-use our fragment, and the shape of this query matches our fragment spec.
      query StoryTableContainerPaginationQuery(
        $count: Int!
        $cursor: Cursor
        $statusFilter: STORY_STATUS
        $searchFilter: String
      ) {
        ...StoryTableContainer_query
          @arguments(
            count: $count
            cursor: $cursor
            statusFilter: $statusFilter
            searchFilter: $searchFilter
          )
      }
    `,
  }
)(StoryTableContainer);

export default enhanced;
