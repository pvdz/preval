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

## Uniformed

`````js filename=intro
var x = 8;
{
  var x = 8;
  while (x) {
    x(x);
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
