# Preval test case

# ident_ident_bin.md

> normalize > assignment > return > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
(function(){ return a = b = c + d; })();
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNewObj;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
tmpNewObj = function () {
  var tmpNestedComplexRhs;
  {
    tmpNestedComplexRhs = c + d;
    b = tmpNestedComplexRhs;
    a = tmpNestedComplexRhs;
    let tmpReturnArg = a;
    return tmpReturnArg;
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
  var tmpNestedComplexRhs;
  tmpNestedComplexRhs = 7;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  let tmpReturnArg = a;
  return tmpReturnArg;
};
tmpNewObj();
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: 7,7,3
 - 1: undefined

Normalized calls: Same

Final output calls: BAD!!
[[7, 7, 7], null];

