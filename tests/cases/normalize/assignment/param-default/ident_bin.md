# Preval test case

# ident_bin.md

> normalize > assignment > param-default > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
function f(foo = a = b + c) {
  return foo;
}
$(f());
$(a, b, c);
`````

## Normalized

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedComplexRhs;
  let foo;
  {
    let ifTestTmp = $tdz$__foo === undefined;
    if (ifTestTmp) {
      tmpNestedComplexRhs = b + c;
      a = tmpNestedComplexRhs;
      foo = tmpNestedComplexRhs;
    } else {
      foo = $tdz$__foo;
    }
  }
  return foo;
}
var tmpArg;
let a = 1;
let b = 2;
let c = 3;
tmpArg = f();
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedComplexRhs;
  let foo;
  let ifTestTmp = $tdz$__foo === undefined;
  if (ifTestTmp) {
    tmpNestedComplexRhs = 5;
    a = tmpNestedComplexRhs;
    foo = tmpNestedComplexRhs;
  } else {
    foo = $tdz$__foo;
  }
  return foo;
}
var tmpArg;
let a = 1;
tmpArg = f();
$(tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: 5
 - 1: 5,2,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[5], [5, 5, 3], null];

