# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = function f() {}) && (a = function f() {}));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = function f() {
    debugger;
  }) &&
    (a = function f$1() {
      debugger;
    }),
);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const f = function () {
  debugger;
  return undefined;
};
a = f;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const f$1 = function () {
    debugger;
    return undefined;
  };
  const tmpNestedComplexRhs = f$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const f$1 = function () {
  debugger;
  return undefined;
};
$(f$1);
$(f$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
$( a );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
