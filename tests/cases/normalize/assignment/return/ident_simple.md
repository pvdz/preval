# Preval test case

# ident_simple.md

> normalize > assignment > return > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
(function(){ return a = b; })();
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
    a = b;
    let tmpStmtArg = b;
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
  a = 2;
  return 2;
};
tmpNewObj();
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[2, 2, 3], null];

Normalized calls: Same

Final output calls: Same
