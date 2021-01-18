# Preval test case

# complex_sequence.md

> return > complex_sequence
>
> Returning a sequence that ends in a simple node

#TODO

## Input

`````js filename=intro
function f(){ 
  return ($(1), $(2), $(3));
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  $(1);
  $(2);
  {
    let tmpStmtArg = $(3);
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
  $(2);
  let tmpStmtArg = $(3);
  return tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
[[1], [2], [3], [null], null];

Normalized calls: Same

Final output calls: Same
