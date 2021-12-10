import type { NextFetchEvent, NextRequest } from 'next/server'
import { gql } from "@apollo/client"
import client from "./api/apollo-client"

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

    const pages = ["", "blog", "about", "contact", "resume", "portfolio"];
    const slug = `${req.url.substring(1)}`;

    if (!pages.includes(slug)) {
        const { data } = await client.query({
            query: gql`
            {
                allPosts {
                    slug
                }
                allTags {
                    name
                }
            }
            `
        })

        const SLUG = data.allPosts.filter((e: any) => e.slug === slug);
        const TAG = data.allTags.filter((e: any) => e.name === `${slug.substring(4)}`);

        if (SLUG.length === 0 && TAG.length === 0) {
            return new Response(JSON.stringify("404 | PAGE NOT FOUND!"), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    }
}
