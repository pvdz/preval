# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
function f() {
  return $('foo'.length);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  return $('foo'.length);
}
$(f());
`````

## Output

`````js filename=intro
function f() {
  return $('foo'.length);
}
$(f());
`````
