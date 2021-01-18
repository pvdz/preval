# Preval test case

# return_sequence.md

> normalize > sequence > return_sequence
>
> Returning a sequence

#TODO

## Input

`````js filename=intro
function f() {
  return ($(1), $(2))
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  $(1);
  {
    let tmpStmtArg = $(2);
    return tmpStmtArg;
  }
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  $(1);
  let tmpStmtArg = $(2);
  return tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
[[1], [2], [null], null];

Normalized calls: Same

Final output calls: Same
