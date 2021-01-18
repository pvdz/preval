# Preval test case

# scoping.md

> normalize > for > regular > scoping
>
> The var decl in a for-header has its own scope so our transform should not break that

#TODO

## Input

`````js filename=intro
const x = 1;
for (const x = 2;;) $(x);
`````

## Normalized

`````js filename=intro
const x = 1;
{
  const x = 2;
  while (true) {
    $(x);
  }
}
`````

## Output

`````js filename=intro
const x = 1;
const x = 2;
while (true) {
  $(x);
}
`````

## Result

Should call `$` with:
[
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  '<crash[ Loop aborted by Preval test runner ]>',
];

Normalized calls: Same

Final output calls: BAD!!
["<crash[ Identifier 'x' has already been declared ]>"];

