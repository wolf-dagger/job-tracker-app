"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { createJobApplication } from "@/lib/actions/job-applications";

interface CreateJobApplicationDialogProps {
  columnId: string;
  boardId: string;
}

const INITIAL_FORM_DATA = {
  company: "",
  position: "",
  location: "",
  notes: "",
  salary: "",
  jobUrl: "",
  tags: "",
  description: "",
};

const CreateJobApplicationDialog = ({
  columnId,
  boardId,
}: CreateJobApplicationDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({ ...INITIAL_FORM_DATA });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const result = await createJobApplication({
        ...formData,
        columnId,
        boardId,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tags) => tags.length > 0),
      });

      if (!result.error) {
        setFormData({ ...INITIAL_FORM_DATA });
        setOpen(false);
      } else {
        console.error("Failed to create job application:", result.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          {/* <Button variant={"outline"}> */}
          <div className="flex items-center border border-gray-200 px-2 py-1 text-sm rounded-md cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            Add Job
          </div>
          {/* </Button> */}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Job Application</DialogTitle>
            <DialogDescription>Track a new job application</DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    required
                    placeholder="Company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    required
                    placeholder="Position"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    id="salary"
                    placeholder="&#8377;5LPA - &#8377;10LPA"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobURL">Job URL</Label>
                  <Input
                    id="jobURL"
                    placeholder="https://example.com"
                    value={formData.jobUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, jobUrl: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    placeholder="React, Tailwind, Next.js"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    rows={3}
                    id="description"
                    placeholder="Brief description of the job"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    rows={4}
                    id="notes"
                    placeholder="Notes..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="grid grid-cols-2">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={"bg-pink-500 hover:bg-pink-600 transition-colors"}
              >
                Add Job
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateJobApplicationDialog;
