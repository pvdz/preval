# Preval test case

# ident_sequence_complex.md

> normalize > assignment > return > ident_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
(function(){ return a = ($(b), $(c)); })();
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNewObj;
let a = 1;
let b = 2;
let c = 3;
tmpNewObj = function () {
  {
    $(b);
    a = $(c);
    let tmpStmtArg = a;
    return tmpStmtArg;
  }
};
tmpNewObj();
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNewObj;
let a = 1;
tmpNewObj = function () {
  $(2);
  a = $(3);
  let tmpStmtArg = a;
  return tmpStmtArg;
};
tmpNewObj();
$(a, 2, 3);
`````
