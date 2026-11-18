import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import MainLayout from "src/layouts/main";

import { SplashScreen } from "src/components/loading-screen";

import { authRoutes } from "./auth";
import { errorRoutes } from "./error";
import { commonRoutes } from "./common";
import { careerRoutes } from "./career";
import { travelRoutes } from "./travel";
import { marketingRoutes } from "./marketing";
import { eLearningRoutes } from "./elearning";
import { eCommerceRoutes } from "./ecommerce";
import { componentsRoutes } from "./components";

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import("src/pages/home"));
const SupportPage = lazy(() => import("src/pages/support"));
const BlogPostsPage = lazy(() => import("src/pages/blog/posts"));
const BlogPostPage = lazy(() => import("src/pages/blog/post"));

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      element: (
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      ),
      children: [
        {
          element: (
            <MainLayout disabledSpacing>
              <IndexPage />
            </MainLayout>
          ),
          index: true,
        },

        {
          path: "support",
          element: (
            <MainLayout>
              <SupportPage />
            </MainLayout>
          ),
        },

        {
          path: "blog",
          element: (
            <MainLayout>
              <BlogPostsPage />
            </MainLayout>
          ),
        },

        {
          path: "blog/:slug",
          element: (
            <MainLayout>
              <BlogPostPage />
            </MainLayout>
          ),
        },

        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}
