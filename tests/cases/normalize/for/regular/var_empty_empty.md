# Preval test case

# _base.md

> normalize > for > regular > _base
>
> Regular for-loop

#TODO

## Input

`````js filename=intro
let b = 2, c = 3, d = 4;
for (var a = 1; ; ) $(d);
`````

## Normalized

`````js filename=intro
var a;
let b = 2;
let c = 3;
let d = 4;
{
  a = 1;
  while (true) {
    $(d);
  }
}
`````

## Output

`````js filename=intro
var a;
a = 1;
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
