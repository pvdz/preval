# Preval test case

# ident_ident_simple.md

> normalize > assignment > return > ident_ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
(function(){ return a = b = c; })();
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
    b = c;
    a = c;
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
let b = 2;
tmpNewObj = function () {
  b = 3;
  a = 3;
  let tmpStmtArg = a;
  return tmpStmtArg;
};
tmpNewObj();
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 3,3,3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
