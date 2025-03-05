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
const tmpCalleeParam$1 = rex;
const tmpCalleeParam$3 = function ($$0) {
  let c = $$0;
  debugger;
  const tmpCalleeParam$5 = c;
  const tmpCalleeParam$7 = obj[c];
  $(tmpCalleeParam$5, tmpCalleeParam$7);
  const tmpReturnArg = obj[c];
  return tmpReturnArg;
};
const tmpCalleeParam = `a is not b`.replace(tmpCalleeParam$1, tmpCalleeParam$3);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const obj /*:object*/ = { a: 1, b: 2 };
const tmpCalleeParam$3 /*:(unknown)=>unknown*/ = function ($$0) {
  const c /*:unknown*/ = $$0;
  debugger;
  const tmpCalleeParam$7 /*:unknown*/ = obj[c];
  $(c, tmpCalleeParam$7);
  const tmpReturnArg /*:unknown*/ = obj[c];
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
  const c = $$0;
  debugger;
  const d = a[ c ];
  $( c, d );
  const e = a[ c ];
  return e;
};
const f = /\w.*\w/g;
const g = "a is not b".replace( f, b );
$( g );
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
