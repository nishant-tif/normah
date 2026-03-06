"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  CircularProgress,
  Alert,
  Stack,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  setSelectedArticle,
  clearError,
} from "@/store/slices/articleSlice";
import { Article } from "@/types/article";
import { ArticleTable } from "@/components/article/ArticleTable";
import ArticleFormMUI from "@/components/article/ArticleFormMUI";
import Layout from "../layout/Layout";
import { useRouter } from "next/navigation";

export interface ArticleFormProps {
  article: Article | null;
  onSubmit: (formData: Omit<Article, "article_id">) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}
export const ArticlesPage: React.FC = () => {
  const navigate = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { articles, loading, error, selectedArticle, total, page, limit } =
    useSelector((state: RootState) => state.articles);
  console.log("limit", limit);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    dispatch(setSelectedArticle(null));
  };

  const handleEdit = (article: Article) => {
    dispatch(setSelectedArticle(article));
    setOpenDialog(true);
  };

  const handleDelete = async (articleId: string) => {
    await dispatch(deleteArticle(articleId));
  };

  const handleSubmit = async (formData: unknown) => {
    setFormLoading(true);

    try {
      if (selectedArticle) {
        await dispatch(
          updateArticle({
            // eslint-disable-next-line
            id: selectedArticle?.id!,
            // eslint-disable-next-line
            article: formData!,
          }),
        );
      } else {
        // eslint-disable-next-line
        await dispatch(createArticle(formData as Omit<Article, "id">));
      }

      handleCloseDialog();

      dispatch(
        fetchArticles({
          page: 1,
          search: searchQuery,
        }),
      );
    } finally {
      setFormLoading(false);
    }
  };
  // Load Articles
  useEffect(() => {
    dispatch(
      fetchArticles({
        page,
        search: searchQuery,
      }),
    );
  }, [dispatch, page, limit, searchQuery, openDialog]);
  const handlePageChange = (newPage: number) => {
    dispatch(
      fetchArticles({
        page: newPage,
        search: searchQuery,
      }),
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    dispatch(
      fetchArticles({
        page: 1,
        search: query,
      }),
    );
  };
  const handleNavigation = () => {
    navigate.push("/articles/new");
  };
  return (
    <Layout title="">
      <Paper
        elevation={0}
        sx={{ p: 4, borderRadius: 2, backgroundColor: "#fff" }}
      >
        {/* Header */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 1, color: "#1a1a1a" }}
            >
              Articles
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleNavigation}
            size="large"
            sx={{
              background: "#000",
              color: "white",
              fontWeight: 600,
              px: 3,
              py: 1.5,
              textTransform: "none",
              fontSize: "14px",
              "&:hover": {
                background: "#333",
              },
            }}
          >
            New Article
          </Button>
        </Stack>

        {/* Error */}
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
            onClose={() => dispatch(clearError())}
          >
            {error}
          </Alert>
        )}

        {/* Loading */}
        {loading && !articles.length && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Table */}
        {(!loading || articles.length > 0) && (
          <ArticleTable
            articles={articles}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
            totalCount={total}
            currentPage={page}
            pageSize={limit}
            onPageChange={handlePageChange}
            onSearch={handleSearch}
          />
        )}
      </Paper>

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <ArticleFormMUI
            article={selectedArticle}
            // onSubmit={handleSubmit}
            onCancel={handleCloseDialog}
            // loading={formLoading}
          />
        </Box>
      </Dialog>
    </Layout>
  );
};

export default ArticlesPage;
