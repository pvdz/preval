# Preval test case

# string_replace_regex_obj_func3.md

> Type tracked > String method > String replace regex obj func3
>
> (This case ended up badly)

## Input

`````js filename=intro
const obj = {a: 1, b: 2};
const rex = /\w.*\w/g;
$('a is not b'.replace(rex, (c) => ($(c, obj[c]), obj[c])));
`````

## Pre Normal


`````js filename=intro
const obj = { a: 1, b: 2 };
const rex = /\w.*\w/g;
$(
  `a is not b`.replace(rex, ($$0) => {
    let c = $$0;
    debugger;
    return $(c, obj[c]), obj[c];
  }),
);
`````

## Normalized


`````js filename=intro
const obj = { a: 1, b: 2 };
const rex = /\w.*\w/g;
const tmpCallCallee = $;
const tmpCalleeParam$1 = rex;
const tmpCalleeParam$3 = function ($$0) {
  let c = $$0;
  debugger;
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$5 = c;
  const tmpCalleeParam$7 = obj[c];
  tmpCallCallee$1(tmpCalleeParam$5, tmpCalleeParam$7);
  const tmpReturnArg = obj[c];
  return tmpReturnArg;
};
const tmpCalleeParam = `a is not b`.replace(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const obj /*:object*/ = { a: 1, b: 2 };
const tmpCalleeParam$3 /*:(unknown)=>?*/ = function ($$0) {
  const c = $$0;
  debugger;
  const tmpCalleeParam$7 = obj[c];
  $(c, tmpCalleeParam$7);
  const tmpReturnArg = obj[c];
  return tmpReturnArg;
};
const rex /*:regex*/ = /\w.*\w/g;
const tmpCalleeParam /*:string*/ = `a is not b`.replace(rex, tmpCalleeParam$3);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = function($$0 ) {
  const c = d;
  debugger;
  const e = a[ c ];
  $( c, e );
  const f = a[ c ];
  return f;
};
const g = /\w.*\w/g;
const h = "a is not b".replace( g, b );
$( h );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a is not b', undefined
 - 2: 'undefined'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same