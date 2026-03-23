"use client";

import { Board, Column, JobApplication } from "@/lib/models/models.types";
import {
  Award,
  Calendar,
  CheckCircle,
  Mic,
  MoreVertical,
  TrashIcon,
  XCircle,
} from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import CreateJobApplicationDialog from "./create-job-dialog";
import JobApplicationCard from "./job-application-card";
import { Button } from "./ui/button";

interface KanbanBoardProps {
  board: Board;
  userId: string;
}

interface ColConfig {
  color: string;
  icon: React.ReactNode;
}
const COLUMN_CONFIG: Array<ColConfig> = [
  {
    color: "bg-cyan-500",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  {
    color: "bg-purple-500",
    icon: <Mic className="w-4 h-4" />,
  },
  {
    color: "bg-green-500",
    icon: <Award className="w-4 h-4" />,
  },
  {
    color: "bg-yellow-500",
    icon: <Calendar className="w-4 h-4" />,
  },
  {
    color: "bg-red-500",
    icon: <XCircle className="w-4 h-4" />,
  },
];

function DroppableColumn({
  column,
  config,
  boardId,
  sortedColumns,
}: {
  column: Column;
  config: ColConfig;
  boardId: string;
  sortedColumns: Column[];
}) {
  const sortedJobs =
    column.jobApplications?.sort((a, b) => a.order - b.order) || [];
  return (
    <>
      <Card className="min-w-75 shrink-0 shadow-md p-0">
        <CardHeader
          className={`${config.color} text-white rounded-t-lg pb-3 pt-3`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {config.icon}
              <CardTitle className="text-white text-base font-semibold">
                {column.name}
              </CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div>
                  <Button
                    variant="ghost"
                    size={"icon"}
                    className={"h-6 w-6 text-white hover:bg-white/20"}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem className={"text-destructive"}>
                    <TrashIcon className="mr-2 h-4 w-4" />
                    Delete Column
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-2 pt-4 bg-gray-50/50 min-h-100 rounded-b-lg">
          {sortedJobs.map((job, key) => (
            <SortableJobCard
              key={key}
              job={{ ...job, columnId: job.columnId || column._id }}
              columns={sortedColumns}
            />
          ))}

          <CreateJobApplicationDialog columnId={column._id} boardId={boardId} />
        </CardContent>
      </Card>
    </>
  );
}

function SortableJobCard({
  job,
  columns,
}: {
  job: JobApplication;
  columns: Column[];
}) {
  return (
    <>
      <JobApplicationCard job={job} columns={columns} />
    </>
  );
}

const KanbanBoard = ({ board, userId }: KanbanBoardProps) => {
  const columns = board.columns;

  const sortedColumns = columns?.sort((a, b) => a.order - b.order) || [];

  return (
    <>
      <div>
        <div>
          {columns.map((col, key) => {
            const config = COLUMN_CONFIG[key] || {
              color: "bg-gray-500",
              icon: <Calendar className="w-4 h-4" />,
            };
            return (
              <DroppableColumn
                key={key}
                column={col}
                config={config}
                boardId={board._id}
                sortedColumns={sortedColumns}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default KanbanBoard;
