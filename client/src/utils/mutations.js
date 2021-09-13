import { gql } from '@apollo/client';

export const CREATE_MATCHUP = gql`
  mutation createMatchup($tech1: String!, $tech2: String!) {
    createMatchup(tech1: $tech1, tech2: $tech2) {
      _id
      tech1
      tech2
    }
  }
`;

export const CREATE_VOTE = gql`
  mutation createVote($_id: String!, $techNum: Int!) {
    createVote(_id: $_id, techNum: $techNum) {
      _id
      tech1
      tech2
      tech1_votes
      tech2_votes
    }
  }
`;

export const DELETE_MATCHUP = gql`
  mutation deleteMatchup($_id: String) {
    deleteMatchup (
      where: {
        id: {
          _eq: $_id
        }
      }
    ) {
      affected_rows
    }
  }

`;

// // WATCHLIST CREATE | _id : this is a mongo id auto-gen
// export const CREATE_MOVIE = gql`
//   mutation createVote($_id: String!, $techNum: Int!) {
//     createVote(_id: $_id, techNum: $techNum) {
//       _id
//       movieName
//       description
//       movielink
//     }
//   }
// `;
