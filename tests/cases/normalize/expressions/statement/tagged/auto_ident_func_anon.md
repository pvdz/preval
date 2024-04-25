# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Statement > Tagged > Auto ident func anon
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${function () {}} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], function () {
  debugger;
});
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpCalleeParam$1 = function () {
  debugger;
  return undefined;
};
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpCalleeParam$1 = function () {
  debugger;
  return undefined;
};
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = [ "before ", " after" ];
const c = function() {
  debugger;
  return undefined;
};
$( b, c );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['before ', ' after'], '<function>'
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
