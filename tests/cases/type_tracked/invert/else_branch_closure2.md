# Preval test case

# else_branch_closure2.md

> Type tracked > Invert > Else branch closure2
>
> If you create a closure in the else branch then the closure must always be the falsy value...

Just wanted an eval test to cover this case to make sure

## Input

`````js filename=intro
function f(y) {
  const x = '' + y;
  if (x) {
  } else {
    const g = function(z) {
      $('keepme');
      return [x, z];
    }
    $(g(10), 'pass');
    $(g(20), 'pass');
  }
}
f('');
f('foop');
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let y = $$0;
  debugger;
  const x = `` + y;
  if (x) {
  } else {
    const g = function ($$0) {
      let z = $$0;
      debugger;
      $(`keepme`);
      return [x, z];
    };
    $(g(10), `pass`);
    $(g(20), `pass`);
  }
};
f(``);
f(`foop`);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let y = $$0;
  debugger;
  const x = $coerce(y, `plustr`);
  if (x) {
    return undefined;
  } else {
    const g = function ($$0) {
      let z = $$0;
      debugger;
      $(`keepme`);
      const tmpReturnArg = [x, z];
      return tmpReturnArg;
    };
    const tmpCallCallee = $;
    const tmpCalleeParam = g(10);
    const tmpCalleeParam$1 = `pass`;
    tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$3 = g(20);
    const tmpCalleeParam$5 = `pass`;
    tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
    return undefined;
  }
};
f(``);
f(`foop`);
`````

## Output


`````js filename=intro
const f /*:(string)=>undefined*/ = function ($$0) {
  const y /*:string*/ = $$0;
  debugger;
  const g /*:(number)=>array*/ = function ($$0) {
    const z /*:number*/ = $$0;
    debugger;
    $(`keepme`);
    const tmpReturnArg /*:array*/ = [y, z];
    return tmpReturnArg;
  };
  if (y) {
    return undefined;
  } else {
    const tmpCalleeParam /*:array*/ = g(10);
    $(tmpCalleeParam, `pass`);
    const tmpCalleeParam$3 /*:array*/ = g(20);
    $(tmpCalleeParam$3, `pass`);
    return undefined;
  }
};
f(``);
f(`foop`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = function($$0 ) {
    const d = $$0;
    debugger;
    $( "keepme" );
    const e = [ b, d ];
    return e;
  };
  if (b) {
    return undefined;
  }
  else {
    const f = c( 10 );
    $( f, "pass" );
    const g = c( 20 );
    $( g, "pass" );
    return undefined;
  }
};
a( "" );
a( "foop" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'keepme'
 - 2: ['', 10], 'pass'
 - 3: 'keepme'
 - 4: ['', 20], 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
