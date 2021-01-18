# Preval test case

# _base.md

> normalize > for > regular > _base
>
> Regular for-loop

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
for (a; ; ) $(d);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
let d = 4;
{
  a;
  while (true) {
    $(d);
  }
}
`````

## Output

`````js filename=intro
while (true) {
  $(4);
}
`````

## Result

Should call `$` with:
[
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  [4],
  '<crash[ Loop aborted by Preval test runner ]>',
];

Normalized calls: Same

Final output calls: Same
