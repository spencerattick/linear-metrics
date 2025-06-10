import { NextResponse } from "next/server";

const LINEAR_API_URL = "https://api.linear.app/graphql";

const NEW_QUERY = `query Issues($first: Int, $orderBy: PaginationOrderBy) {
    issues(first: $first, orderBy: $orderBy) {
      nodes {
        id
        title
        identifier
        description
        createdAt
        updatedAt
        priority
        state {
          id
          name
        }
        assignee {
          name
        }
        team {
          name
        }
      }
    }
  }`;

export async function GET() {
  const apiToken = process.env.LINEAR_API_TOKEN;

  if (!apiToken) {
    return NextResponse.json(
      { error: "LINEAR_API_TOKEN environment variable is not set" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(LINEAR_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiToken,
      },
      body: JSON.stringify({
        query: NEW_QUERY,
        variables: {
          first: 100, // Adjust this number based on your needs
          orderBy: "createdAt",
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Linear API responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error("Linear API errors:", data.errors);
      return NextResponse.json(
        { error: "Failed to fetch issues from Linear API" },
        { status: 500 }
      );
    }

    // Sort issues by created date descending (newest first)
    const sortedIssues = data.data.issues.nodes.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    console.log('ISSUES: ', sortedIssues)
    return NextResponse.json(sortedIssues);
  } catch (error) {
    console.error("Error fetching Linear issues:", error);
    return NextResponse.json(
      { error: "Failed to fetch issues from Linear" },
      { status: 500 }
    );
  }
}
