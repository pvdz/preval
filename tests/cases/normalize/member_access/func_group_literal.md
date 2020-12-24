# Preval test case

# global_group_literal.md

> normalize > member_access > global_group_literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
function f() {
  const y = (1, 2, 3).foo
  return $(y);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  1;
  2;
  const y = (3).foo;
  return $(y);
}
$(f());
`````

## Output

`````js filename=intro
function f() {
  const y = (3).foo;
  return $(y);
}
$(f());
`````
