# Preval test case

# ident_bin.md

> normalize > assignment > return > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
(function(){ return a = b + c; })();
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
    a = b + c;
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
  a = 5;
  let tmpStmtArg = a;
  return tmpStmtArg;
};
tmpNewObj();
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: 5,2,3
 - 1: undefined

Normalized calls: Same

Final output calls: BAD!!
[[5, 5, 3], null];

