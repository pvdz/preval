# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Ident property access should not be changed

#TODO

## Input

`````js filename=intro
function f() {
  return $(global.foo);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  return $(global.foo);
}
$(f());
`````

## Output

`````js filename=intro
function f() {
  return $(global.foo);
}
$(f());
`````
