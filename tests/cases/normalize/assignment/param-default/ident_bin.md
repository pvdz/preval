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
  const tmpIfTest = $tdz$__foo === undefined;
  if (tmpIfTest) {
    tmpNestedComplexRhs = b + c;
    a = tmpNestedComplexRhs;
    foo = tmpNestedComplexRhs;
  } else {
    foo = $tdz$__foo;
  }
  return foo;
}
var tmpArg;
('<hoisted func decl `f`>');
let a = 1;
let b = 2;
let c = 3;
('<hoisted func decl `f`>');
tmpArg = f();
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedComplexRhs;
  let foo;
  const tmpIfTest = $tdz$__foo === undefined;
  if (tmpIfTest) {
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

