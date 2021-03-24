# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Binary both > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = function f() {}) + (a = function f() {}));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = function f() {
    debugger;
  }) +
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
};
a = f;
let tmpBinBothLhs = a;
const f$1 = function () {
  debugger;
};
a = f$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
};
const f$1 = function () {
  debugger;
};
const tmpCalleeParam = f + f$1;
$(tmpCalleeParam);
$(f$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function() {}function() {}'
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
