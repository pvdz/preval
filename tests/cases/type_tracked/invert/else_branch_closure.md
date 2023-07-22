# Preval test case

# else_branch_closure.md

> Type tracked > Invert > Else branch closure
>
> If you create a closure in the else branch then the closure must always be the falsy value...

Just wanted an eval test to cover this case to make sure

#TODO

## Input

`````js filename=intro
function f(y) {
  const x = '' + y;
  if (x) {
    $(x, 'if');
  } else {
    const f = function(z) {
      $('keepme');
      $('keepme');
      // This must always be an empty string, regardless of y, right?
      // So a rule should be able to replace the occurrence of `x` with an empty string safely...
      return [x, z];
    }
    $(f(10), 'pass');
    $(f(20), 'pass');
  }
}
f($(''));
f($('foop'));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let y = $$0;
  debugger;
  const x = `` + y;
  if (x) {
    $(x, `if`);
  } else {
    const f$1 = function ($$0) {
      let z = $$0;
      debugger;
      $(`keepme`);
      $(`keepme`);
      return [x, z];
    };
    $(f$1(10), `pass`);
    $(f$1(20), `pass`);
  }
};
f($(``));
f($(`foop`));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let y = $$0;
  debugger;
  const x = $coerce(y, `plustr`);
  if (x) {
    $(x, `if`);
    return undefined;
  } else {
    const f$1 = function ($$0) {
      let z = $$0;
      debugger;
      $(`keepme`);
      $(`keepme`);
      const tmpReturnArg = [x, z];
      return tmpReturnArg;
    };
    const tmpCallCallee = $;
    const tmpCalleeParam = f$1(10);
    const tmpCalleeParam$1 = `pass`;
    tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$3 = f$1(20);
    const tmpCalleeParam$5 = `pass`;
    tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
    return undefined;
  }
};
const tmpCallCallee$3 = f;
const tmpCalleeParam$7 = $(``);
tmpCallCallee$3(tmpCalleeParam$7);
const tmpCallCallee$5 = f;
const tmpCalleeParam$9 = $(`foop`);
tmpCallCallee$5(tmpCalleeParam$9);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const y = $$0;
  debugger;
  const f$1 = function ($$0) {
    const z = $$0;
    debugger;
    $(`keepme`);
    $(`keepme`);
    const tmpReturnArg = [x, z];
    return tmpReturnArg;
  };
  const x = $coerce(y, `plustr`);
  if (x) {
    $(x, `if`);
    return undefined;
  } else {
    const tmpCalleeParam = f$1(10);
    $(tmpCalleeParam, `pass`);
    const tmpCalleeParam$3 = f$1(20);
    $(tmpCalleeParam$3, `pass`);
    return undefined;
  }
};
const tmpCalleeParam$7 = $(``);
f(tmpCalleeParam$7);
const tmpCalleeParam$9 = $(`foop`);
f(tmpCalleeParam$9);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  const d = function($$0 ) {
    const e = c;
    debugger;
    $( "keepme" );
    $( "keepme" );
    const f = [ g, e,, ];
    return f;
  };
  const g = $coerce( b, "plustr" );
  if (g) {
    $( g, "if" );
    return undefined;
  }
  else {
    const h = d( 10 );
    $( h, "pass" );
    const i = d( 20 );
    $( i, "pass" );
    return undefined;
  }
};
const j = $( "" );
a( j );
const k = $( "foop" );
a( k );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ''
 - 2: 'keepme'
 - 3: 'keepme'
 - 4: ['', 10], 'pass'
 - 5: 'keepme'
 - 6: 'keepme'
 - 7: ['', 20], 'pass'
 - 8: 'foop'
 - 9: 'foop', 'if'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
