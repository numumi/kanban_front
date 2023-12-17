import { render, screen } from "@testing-library/react";
import { RecoilRoot} from "recoil";
import Board from "./Board";
import '@testing-library/jest-dom';

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"), // 他のnext/navigation機能はそのまま使用
  useParams: () => ({
    id: "1",
  }),
}));

jest.mock("recoil", () => ({
  ...jest.requireActual("recoil"),
  useRecoilValueLoadable: jest.fn().mockImplementation(() => {
    return {
      state: "hasValue",
      contents: {
        id: 1,
        image: "../../../public/wood-texture_00003.jpg",
        name: "Board 1",
        columns: [
          {
            id: "column-1",
            name: "To Do",
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
            tasks: [
              {
                id: "task-4",
                name: "進捗報告",
                description: "進捗報告詳細",
              },
              {
                name: "調査中",
                description: "調査中詳細",
              },
            ],
          },
          {
            id: "column-3",
            name: "Done",
            tasks: [
              {
                id: "task-5",
                name: "納品完了",
                description: "納品完了詳細",
              },
              {
                id: "task-6",
                name: "修正対応",
                description: "修正対応詳細",
              },
            ],
          },
        ],
      },
    };
  }),
}));

test("should render with correct background image", () => {
  render(
    <RecoilRoot>
      <Board />
    </RecoilRoot>
  );

  const container = screen.getByTestId("boardBody");

  expect(container).toHaveStyle('background-image: url(../../../public/wood-texture_00003.jpg)');
});


