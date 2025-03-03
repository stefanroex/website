import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { ProductCard, Grid } from './ProductCard';
import { shuffle } from 'weighted-shuffle';
import useResizeAware from 'react-resize-aware';

const pickRandom = (array, n) =>
  shuffle(array.map(({ probability, ...p }) => [p, probability]))
    .slice(-n)
    .map(([x]) => x);

const products = [
  {
    title: 'Material Kit React PRO',
    description: 'Premium Material-UI Kit - $89',
    image: '../images/affiliates/material-kit-pro-react.jpg',
    url:
      'https://www.creative-tim.com/product/material-kit-pro-react?ref=popper.js.org',
    probability: 1,
  },
  {
    title: 'Material Dashboard PRO',
    description: 'Premium Bootstrap 4 Material Admin - $49',
    image: '../images/affiliates/opt_mdp_thumbnail.jpg',
    url:
      'https://www.creative-tim.com/product/material-dashboard-pro?ref=popper.js.org',
    probability: 1,
  },
  {
    title: 'Now UI Dashboard PRO',
    description: 'Premium Bootstrap 4 Admin - $49',
    image: '../images/affiliates/now-ui-dashboard-pro.jpg',
    url:
      'https://www.creative-tim.com/product/now-ui-dashboard-pro?ref=popper.js.org',
    probability: 1,
  },
  {
    title: 'Light Bootstrap Dashboard React PRO',
    description: 'Premium Bootstrap React Admin Template - $49',
    image: '../images/affiliates/light-bootstrap-dashboard-react.jpg',
    url:
      'https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react?ref=popper.js.org',
    probability: 1,
  },
  {
    title: 'NextJS Material Kit PRO',
    description: 'Premium NextJS Material-UI Kit - $119',
    image: '../images/affiliates/nextjs-material-kit-pro.jpg',
    url:
      'https://www.creative-tim.com/product/nextjs-material-kit-pro?ref=popper.js.org',
    probability: 1,
  },
  {
    title: 'Tailwind Starter Kit',
    description: 'A beautiful extension for TailwindCSS - FREE',
    image: '../images/affiliates/opt_tsp_tailwindcss_thumbnail.jpg',
    url:
      'https://www.creative-tim.com/learning-lab/tailwind-starter-kit/presentation?ref=popper.js.org',
    probability: 1,
  },
  {
    title: 'MDB 5 UI Kit',
    description: `500+ components, free templates, simple installation - MIT license`,
    image: '../images/affiliates/BannerMDB-mini.jpg',
    xlImage: '../images/affiliates/BannerMDB.jpg',
    url: 'https://mdbootstrap.com/docs/standard/?utm_ref_id=26974',
    probability: 2,
  },
];

const random = pickRandom(products, 3);
const bigOne = random.find((x) => x.xlImage != null);

export const CreativeTim = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <>
      <StaticQuery
        query={graphql`
          query getAllImages {
            allImageSharp {
              edges {
                node {
                  id
                  fluid {
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    base64
                    aspectRatio
                    originalImg
                    originalName
                    sizes
                  }
                }
              }
            }
          }
        `}
        render={(data) => {
          if (
            typeof window !== 'undefined' &&
            window.innerWidth > 600 &&
            bigOne
          ) {
            const edge = data.allImageSharp.edges.find((edge) =>
              bigOne.xlImage.includes(edge.node.fluid.originalName)
            );
            return (
              <ProductCard
                title={bigOne.title}
                description={bigOne.description}
                fluid={edge.node.fluid}
                url={bigOne.url}
              />
            );
          } else {
            return (
              <Grid>
                {random.map(({ title, description, image, url }) => {
                  const edge = data.allImageSharp.edges.find((edge) =>
                    image.includes(edge.node.fluid.originalName)
                  );
                  return (
                    <ProductCard
                      title={title}
                      description={description}
                      fluid={edge.node.fluid}
                      url={url}
                    />
                  );
                })}
              </Grid>
            );
          }
        }}
      />
    </>
  );
};
