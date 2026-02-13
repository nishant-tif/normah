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
import { Article, Category, Country, State, City } from "@/types/article";
// import articleService from "@/services/articleService";
import Layout from "@/components/layout/Layout";
import { createArticle, updateArticle } from "@/store/slices/articleSlice";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import toast from "@/utils/toast";
import { useRouter } from "next/navigation";

interface ArticleFormProps {
  article?: Article | null;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const ArticleFormMUI: React.FC<ArticleFormProps> = ({
  article,
  // onSubmit,
  onCancel,
  // loading = false,
}) => {
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    article_title: article?.article_title || "",
    article_slug: article?.article_slug || "",
    article_excerpt: article?.article_excerpt || "",
    article_content: article?.article_content || "",
    article_visibility:
      article?.article_visibility || ("DRAFT" as "DRAFT" | "PUBLISHED"),
    author_id: article?.author_id || 1 || null,
    article_thumbnail_image: article?.article_thumbnail_image || "",
    meta_title: article?.meta_title || "",
    meta_description: article?.meta_description || "",
    meta_keywords: article?.meta_keywords || "",
    category_ids: article?.category_ids || [],
    country_id: article?.country_id || "",
    state_id: article?.state_id || "",
    city_id: article?.city_id || "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.articles);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (formData.country_id) {
      loadStates(formData.country_id);
    }
  }, [formData.country_id]);

  useEffect(() => {
    if (formData.state_id) {
      loadCities(formData.state_id);
    }
  }, [formData.state_id]);

  const loadInitialData = async () => {
    try {
      const [cats, countries] = await Promise.all([
        articleService.getCategories(),
        articleService.getCountries(),
      ]);
      setCategories(cats);
      setCountries(countries);
    } catch (err) {
      setError("Failed to load initial data");
    }
  };

  const loadStates = async (countryId: string) => {
    try {
      const states = await articleService.getStates(countryId);
      setStates(states);
      setFormData((prev) => ({ ...prev, state_id: "", city_id: "" }));
      setCities([]);
    } catch (err) {
      setError("Failed to load states");
    }
  };

  const loadCities = async (stateId: string) => {
    try {
      const cities = await articleService.getCities(stateId);
      setCities(cities);
      setFormData((prev) => ({ ...prev, city_id: "" }));
    } catch (err) {
      setError("Failed to load cities");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >,
  ) => {
    const { name, value } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      category_ids: prev.category_ids.includes(categoryId)
        ? prev.category_ids.filter((id) => id !== categoryId)
        : [...prev.category_ids, categoryId],
    }));
  };

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
      if (article) {
        await dispatch(
          updateArticle({
            id: article.article_id,
            article: formData,
          }),
        ).unwrap();
      } else {
        await dispatch(createArticle(formData)).unwrap();
      }

      onCancel(); // close modal
    } catch (err: any) {
      setError(err || "Failed to save article");
    }
  };

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
              <Grid item xs={12}>
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

              <Grid item xs={12} sm={8}>
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
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  onClick={generateSlug}
                  sx={{ mt: 1, height: 56 }}
                  fullWidth
                >
                  Generate Slug
                </Button>
              </Grid>

              {/* <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Excerpt"
                    name="article_excerpt"
                    value={formData.article_excerpt}
                    onChange={handleInputChange}
                    placeholder="Brief summary of the article"
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                </Grid> */}

              {/* ================= THUMBNAIL (UPDATED DESIGN) ================= */}
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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

              <Grid item xs={12}>
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

              <Grid item xs={12}>
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
              Categories
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <FormGroup>
              <Grid container spacing={1}>
                {categories.map((category) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={category.category_id || category.id}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.category_ids.includes(
                            category.category_id || category.id || "",
                          )}
                          onChange={() =>
                            handleCategoryToggle(
                              category.category_id || category.id || "",
                            )
                          }
                        />
                      }
                      label={category.category_name}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
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
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Country</InputLabel>
                  <Select
                    name="country_id"
                    value={formData.country_id}
                    onChange={handleInputChange}
                    label="Country"
                  >
                    <MenuItem value="">
                      <em>Select Country</em>
                    </MenuItem>
                    {countries.map((country) => (
                      <MenuItem
                        key={country.country_id || country.id}
                        value={country.country_id || country.id}
                      >
                        {country.countryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
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
                  >
                    <MenuItem value="">
                      <em>Select State</em>
                    </MenuItem>
                    {states.map((state) => (
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

              <Grid item xs={12} sm={6} md={4}>
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
                  >
                    <MenuItem value="">
                      <em>Select City</em>
                    </MenuItem>
                    {cities.map((city) => (
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
        <Grid item xs={12} sx={{ backgroundColor: "#fff" }}>
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
  );
};

export default ArticleFormMUI;
