"use client";

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  TablePagination,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import Layout from "@/components/layout/Layout";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  fetchAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "@/store/slices/authorSlice";

const AuthorPage = () => {
  const dispatch = useAppDispatch();

  const { authors, loading, total } = useAppSelector((state) => state.authors);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(null);

  const [localPage, setLocalPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [formError, setFormError] = useState("");

  // ================= FETCH AUTHORS =================
  useEffect(() => {
    dispatch(
      fetchAuthors({
        search,
        page: localPage + 1,
        size: rowsPerPage,
      }),
    );
  }, [dispatch, search, localPage, rowsPerPage]);

  // ================= VALIDATE EMAIL =================
  const isValidEmail = (value: string) => {
    // simple regex
    return /\S+@\S+\.\S+/.test(value);
  };

  // ================= ADD AUTHOR =================
  const handleAddAuthor = async () => {
    setFormError("");

    if (!name || !email) {
      setFormError("Name & Email are required");
      return;
    }
    if (!isValidEmail(email)) {
      setFormError("Invalid email format");
      return;
    }

    await dispatch(
      createAuthor({
        author_name: name,
        author_email: email,
      }),
    );

    setName("");
    setEmail("");

    dispatch(
      fetchAuthors({
        search,
        page: 1,
        size: rowsPerPage,
      }),
    );
  };

  // ================= ACTION MENU =================
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    authorId: string,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedAuthorId(authorId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // ================= DELETE AUTHOR =================
  const handleDelete = async () => {
    if (!selectedAuthorId) return;

    await dispatch(deleteAuthor(selectedAuthorId));
    handleMenuClose();

    dispatch(
      fetchAuthors({
        search,
        page: localPage + 1,
        size: rowsPerPage,
      }),
    );
  };

  // ================= OPEN EDIT MODAL =================
  const handleEditClick = () => {
    if (!selectedAuthorId) return;

    const author = authors.find((a) => a.author_id === selectedAuthorId);
    if (!author) {
      handleMenuClose();
      return;
    }

    setEditName(author.author_name);
    setEditEmail(author.author_email);

    setEditOpen(true);
    handleMenuClose();
  };

  const handleEditSave = async () => {
    setFormError("");

    if (!editName || !editEmail) {
      setFormError("Name & Email are required");
      return;
    }
    if (!isValidEmail(editEmail)) {
      setFormError("Invalid email format");
      return;
    }

    if (selectedAuthorId) {
      await dispatch(
        updateAuthor({
          id: selectedAuthorId,
          author: {
            author_name: editName,
            author_email: editEmail,
          },
        }),
      );

      setEditOpen(false);

      dispatch(
        fetchAuthors({
          search,
          page: localPage + 1,
          size: rowsPerPage,
        }),
      );
    }
  };

  return (
    <Layout title="Article Authors">
      <Box sx={{ p: 4, backgroundColor: "#f6f6f6", minHeight: "100vh" }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Article Author
        </Typography>

        <Grid spacing={3} sx={{ display: "flex", gap: 4 }}>
          {/* ADD AUTHOR FORM */}

          <Grid sx={{ width: "30%" }}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Add Author
              </Typography>

              {formError && (
                <Typography color="error" sx={{ mb: 1 }}>
                  {formError}
                </Typography>
              )}

              <TextField
                fullWidth
                label="Author Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Author Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={handleAddAuthor}
                disabled={loading}
                sx={{
                  backgroundColor: "#000",
                  "&:hover": { backgroundColor: "#333" },
                }}
              >
                {loading ? <CircularProgress size={20} /> : "Add New Author"}
              </Button>
            </Paper>
          </Grid>

          {/* AUTHOR TABLE */}
          <Grid sx={{ width: "70%" }}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <TextField
                fullWidth
                placeholder="Search author"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setLocalPage(0);
                }}
                sx={{ mb: 2 }}
              />

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {authors.map((author) => (
                      <TableRow key={author.author_id}>
                        <TableCell>{author.author_name}</TableCell>
                        <TableCell>{author.author_email}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={(e) => handleMenuOpen(e, author.author_id)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                component="div"
                count={total}
                page={localPage}
                onPageChange={(_, newPage) => setLocalPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setLocalPage(0);
                }}
              />
            </Paper>
          </Grid>
        </Grid>

        {/* ACTION MENU */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditClick}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>

        {/* EDIT AUTHOR DIALOG */}
        <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
          <DialogTitle>Edit Author</DialogTitle>
          <DialogContent>
            {formError && (
              <Typography color="error" sx={{ mb: 1 }}>
                {formError}
              </Typography>
            )}
            <TextField
              fullWidth
              label="Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSave} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default AuthorPage;
