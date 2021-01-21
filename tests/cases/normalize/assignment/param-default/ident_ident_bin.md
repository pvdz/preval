# Preval test case

# ident_ident_bin.md

> normalize > assignment > param-default > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
function f(foo = a = b = c + d) {
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
      tmpNestedComplexRhs = c + d;
      b = tmpNestedComplexRhs;
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
let d = 4;
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
    tmpNestedComplexRhs = 7;
    b = tmpNestedComplexRhs;
    a = tmpNestedComplexRhs;
    foo = tmpNestedComplexRhs;
  } else {
    foo = $tdz$__foo;
  }
  return foo;
}
var tmpArg;
let a = 1;
let b = 2;
tmpArg = f();
$(tmpArg);
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: 7
 - 1: 7,7,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[7], [7, 7, 7], null];

