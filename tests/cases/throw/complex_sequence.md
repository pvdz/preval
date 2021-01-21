# Preval test case

# complex_sequence.md

> return > complex_sequence
>
> Returning a sequence that ends in a simple node

#TODO

## Input

`````js filename=intro
function f(){ 
  throw ($(1), $(2), $(3));
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    $(1);
    $(2);
    let tmpStmtArg = $(3);
    throw tmpStmtArg;
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
  throw tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: 3
 - 3: <crash[ 3 ]>

Normalized calls: Same

Final output calls: Same
