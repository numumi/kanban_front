import { render, screen } from "@testing-library/react";
import Column from "@/features/components/boards/Column";
import "@testing-library/jest-dom";
import { RecoilRoot, useRecoilState } from "recoil";
import { columnsState } from "@/recoils/atoms/boardState";
import { useEffect } from "react";

const columnsValue = [
  {
    id: "column-1",
    name: "To Do",
    board_id: 1,
    tasks: [
      {
        id: "task-1",
        name: "発注書",
        description: "発注書詳細",
      },
      {
        id: "task-2",
        name: "検討中",
        description: "検討中詳細",
      },
      {
        id: "task-3",
        name: "見積もり",
        description: "見積もり詳細",
      },
    ],
  },
  {
    id: "column-2",
    name: "In Progress",
    board_id: 1,
    tasks: [
      {
        id: "task-4",
        name: "進捗報告",
        description: "進捗報告詳細",
      },
      {
        id: "task-5",
        name: "調査中",
        description: "調査中詳細",
      },
    ],
  },
  {
    id: "column-3",
    name: "Done",
    board_id: 1,
    tasks: [
      {
        id: "task-6",
        name: "納品完了",
        description: "納品完了詳細",
      },
      {
        id: "task-7",
        name: "修正対応",
        description: "修正対応詳細",
      },
    ],
  },
];

const TestComponent = () => {
  const [columns, setColumns] = useRecoilState(columnsState);
  useEffect(() => {
    setColumns(columnsValue);
  }, []);

  const column = columns[0];
  return <Column column={column} />;
};

test("Columnがレンダリングされている", () => {
  render(
    <RecoilRoot initializeState={({ set }) => set(columnsState, columnsValue)}>
      <TestComponent />
    </RecoilRoot>
  );

  const container = screen.getByTestId("column");

  expect(container).toHaveTextContent("発注書");
  expect(container).toHaveTextContent("To Do");
  expect(container).toHaveTextContent("追加");
});
