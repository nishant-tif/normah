"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Alert,
  CircularProgress,
  Grid,
  Divider,
  Stack,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Layout from "@/components/layout/Layout";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchCategories } from "@/store/slices/categorySlice";
import { fetchCountries } from "@/store/slices/countriesSlice";
import { fetchStates } from "@/store/slices/stateSlice";
import { fetchCities } from "@/store/slices/citySlice";
import { createArticle } from "@/store/slices/articleSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import type { Article } from "@/types/article";
import { SelectChangeEvent } from "@mui/material/Select";

interface ArticleFormProps {
  article?: Article | null;
  onCancel: () => void;
  loading?: boolean;
}

interface Country {
  id: string | number;
  countryName: string;
}
interface State {
  id: string;
  state_id: string;
  stateName: string;
}
interface City {
  id: string;
  city_id: string;
  cityName: string;
}
const AddArticle: React.FC<ArticleFormProps> = ({
  article,
  onCancel,
  loading = false,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();

  const { categories } = useAppSelector((state) => state.categories);
  const { countries } = useAppSelector((state) => state.countries);
  const { states } = useAppSelector((state) => state.states);
  const { cities } = useAppSelector((state) => state.cities);
  console.log("countries", countries);
  const [error, setError] = useState<string>("");

  const [formData, setFormData] = useState({
    article_title: article?.article_title ?? "",
    article_slug: article?.article_slug ?? "",
    article_excerpt: article?.article_excerpt ?? "",
    article_content: article?.article_content ?? "",
    article_visibility: article?.article_visibility ?? "DRAFT",
    author_id: article?.author_id ?? 1,
    article_thumbnail_image: article?.article_thumbnail_image ?? "",
    meta_title: article?.meta_title ?? "",
    meta_description: article?.meta_description ?? "",
    meta_keywords: article?.meta_keywords ?? "",
    category_ids: article?.category_ids ?? [],
    country_id: article?.country_id ?? "",
    state_id: article?.state_id ?? "",
    city_id: article?.city_id ?? "",
  });

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    dispatch(fetchCategories({ page: 1, size: 100 }));
    dispatch(fetchCountries());
  }, [dispatch]);

  /* ================= FETCH STATES ================= */
  useEffect(() => {
    if (formData.country_id) {
      dispatch(fetchStates(formData.country_id));
    }
  }, [formData.country_id, dispatch]);

  /* ================= FETCH CITIES ================= */
  useEffect(() => {
    if (formData.state_id) {
      dispatch(fetchCities(formData.state_id));
    }
  }, [formData.state_id, dispatch]);

  /* ================= INPUT CHANGE ================= */
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "country_id") {
        return {
          ...prev,
          country_id: value,
          state_id: "",
          city_id: "",
        };
      }

      if (name === "state_id") {
        return {
          ...prev,
          state_id: value,
          city_id: "",
        };
      }

      return {
        ...prev,
        [name as keyof typeof prev]: value,
      };
    });
  };

  /* ================= CATEGORY TOGGLE ================= */
  const handleCategoryToggle = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      category_ids: prev.category_ids.includes(categoryId)
        ? prev.category_ids.filter((id) => id !== categoryId)
        : [...prev.category_ids, categoryId],
    }));
  };

  /* ================= SLUG ================= */
  const generateSlug = () => {
    const slug = formData.article_title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setFormData((prev) => ({
      ...prev,
      article_slug: slug,
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.article_title ||
      !formData.article_slug ||
      !formData.article_content
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      await dispatch(createArticle(formData)).unwrap();
      toast.success("Article created successfully!");
      navigate.push("/articles");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save article");
    }
  };

  /* ================= FILE UPLOAD ================= */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 200 * 1024) {
      setError("Image must be less than 200KB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        article_thumbnail_image: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <Layout title="">
      <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", py: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
          {article ? "Edit Article" : "Create New Article"}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* Basic Information Section */}
          <Card sx={{ mb: 3, boxShadow: 1 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Basic Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid
                spacing={2}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Grid>
                  <TextField
                    fullWidth
                    label="Title"
                    name="article_title"
                    value={formData.article_title}
                    onChange={handleInputChange}
                    placeholder="Enter article title"
                    required
                    variant="outlined"
                  />
                </Grid>

                <Grid>
                  <TextField
                    fullWidth
                    label="Slug"
                    name="article_slug"
                    value={formData.article_slug}
                    onChange={handleInputChange}
                    placeholder="auto-generated-from-title"
                    required
                    helperText="URL-friendly version of the title (auto-generated, but you can edit it)"
                    variant="outlined"
                  />
                </Grid>
                <Grid>
                  <Button
                    variant="outlined"
                    onClick={generateSlug}
                    sx={{ mt: 1, height: 56 }}
                    fullWidth
                  >
                    Generate Slug
                  </Button>
                </Grid>

                {/* ================= THUMBNAIL (UPDATED DESIGN) ================= */}
                <Grid>
                  <Typography sx={{ fontWeight: 600, mb: 1 }}>
                    Thumbnail Image *
                  </Typography>

                  <Typography sx={{ color: "#f78fb3", mb: 2 }}>
                    Widget Image
                  </Typography>

                  <Box
                    sx={{
                      width: 200,
                      height: 200,
                      border: "2px dashed #f8a5c2",
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#fff",
                      mb: 2,
                      overflow: "hidden",
                    }}
                  >
                    {formData.article_thumbnail_image ? (
                      <Box
                        component="img"
                        src={formData.article_thumbnail_image}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Typography sx={{ fontSize: 40, color: "#ccc" }}>
                        📷
                      </Typography>
                    )}
                  </Box>

                  <Typography sx={{ fontSize: 13, color: "#777", mb: 1 }}>
                    Widget image: max image size 100–200 kb.
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      border: "1px solid #f8a5c2",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <Button
                      component="label"
                      sx={{
                        flex: 1,
                        justifyContent: "flex-start",
                        textTransform: "none",
                        color: "#777",
                      }}
                    >
                      Choose File
                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </Button>

                    <Box
                      sx={{
                        backgroundColor: "#f78fb3",
                        color: "#fff",
                        px: 3,
                        display: "flex",
                        alignItems: "center",
                        fontWeight: 600,
                      }}
                    >
                      BROWSE
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              {/* </Grid> */}
            </CardContent>
          </Card>

          {/* SEO & Meta Information Section */}
          <Card sx={{ mb: 3, boxShadow: 1 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                SEO & Meta Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid
                spacing={2}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Grid>
                  <TextField
                    fullWidth
                    label="Meta Title"
                    name="meta_title"
                    value={formData.meta_title}
                    onChange={handleInputChange}
                    placeholder="Meta title for search engines (50-60 characters)"
                    inputProps={{ maxLength: 60 }}
                    helperText={`${formData.meta_title.length}/60 characters`}
                    variant="outlined"
                  />
                </Grid>

                <Grid>
                  <TextField
                    fullWidth
                    label="Meta Description"
                    name="meta_description"
                    value={formData.meta_description}
                    onChange={handleInputChange}
                    placeholder="Meta description for search engines (150-160 characters)"
                    multiline
                    rows={3}
                    inputProps={{ maxLength: 160 }}
                    helperText={`${formData.meta_description.length}/160 characters`}
                    variant="outlined"
                  />
                </Grid>

                <Grid>
                  <TextField
                    fullWidth
                    label="Meta Keywords"
                    name="meta_keywords"
                    value={formData.meta_keywords}
                    onChange={handleInputChange}
                    placeholder="Comma-separated keywords (e.g., keyword1, keyword2, keyword3)"
                    helperText="Separate keywords with commas"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Categories Section */}
          <Card sx={{ mb: 3, boxShadow: 1 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Category
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>

                <Select
                  name="category_id"
                  value={formData.category_ids[0] || ""}
                  label="Category"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category_ids: [e.target.value],
                    }))
                  }
                >
                  <MenuItem value="">
                    <em>Select Category</em>
                  </MenuItem>

                  {categories.map((category) => (
                    <MenuItem
                      key={category.category_id || category.id}
                      value={category.category_id || category.id}
                    >
                      {category.category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>

          {/* Location Section */}
          <Card sx={{ mb: 3, boxShadow: 1 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Location
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Country</InputLabel>
                    <Select
                      name="country_id"
                      value={formData.country_id}
                      onChange={handleInputChange}
                      label="Country"
                      sx={{
                        width: formData.country_id ? "auto" : "7rem",
                      }}
                    >
                      <MenuItem value="">
                        <em>Select Country</em>
                      </MenuItem>
                      {countries &&
                        countries?.map((country: Country) => (
                          <MenuItem key={country?.id} value={country?.id}>
                            {country?.countryName}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    disabled={!formData.country_id}
                  >
                    <InputLabel>State</InputLabel>
                    <Select
                      name="state_id"
                      value={formData.state_id}
                      onChange={handleInputChange}
                      label="State"
                      sx={{
                        width: formData.state_id ? "auto" : "7rem",
                      }}
                    >
                      <MenuItem value="">
                        <em>Select State</em>
                      </MenuItem>
                      {states.map((state: State) => (
                        <MenuItem
                          key={state.state_id || state.id}
                          value={state.state_id || state.id}
                        >
                          {state.stateName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    disabled={!formData.state_id}
                  >
                    <InputLabel>City</InputLabel>
                    <Select
                      name="city_id"
                      value={formData.city_id}
                      onChange={handleInputChange}
                      label="City"
                      sx={{
                        width: formData.city_id ? "auto" : "7rem",
                      }}
                    >
                      <MenuItem value="">
                        <em>Select City</em>
                      </MenuItem>
                      {cities.map((city: City) => (
                        <MenuItem
                          key={city.city_id || city.id}
                          value={city.city_id || city.id}
                        >
                          {city.cityName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Grid sx={{ backgroundColor: "#fff" }}>
            <TextField
              fullWidth
              label="Content"
              name="article_content"
              value={formData.article_content}
              onChange={handleInputChange}
              placeholder="Article content"
              multiline
              rows={8}
              required
              variant="outlined"
            />
          </Grid>
          {/* Visibility & Publishing Section */}
          <Card sx={{ mb: 3, boxShadow: 1 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Visibility & Publishing
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  name="article_visibility"
                  value={formData.article_visibility}
                  onChange={handleInputChange}
                  label="Status"
                >
                  <MenuItem value="DRAFT">Draft</MenuItem>
                  <MenuItem value="PUBLISHED">Published</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={onCancel}
              size="large"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={loading}
              size="large"
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Saving...
                </>
              ) : article ? (
                "Update Article"
              ) : (
                "Create Article"
              )}
            </Button>
          </Stack>
        </form>
      </Box>
    </Layout>
  );
};

export default AddArticle;
