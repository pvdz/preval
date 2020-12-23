# Preval test case

# global_group_ident.md

> normalize > member_access > global_group_ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
function f() {
  const a = {x: 1}
  const y = (1, a).x
  return $(y);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const a = { x: 1 };
  const y = (1, a).x;
  return $(y);
}
$(f());
`````

## Output

`````js filename=intro
function f() {
  const a = { x: 1 };
  const y = (1, a).x;
  return $(y);
}
$(f());
`````
