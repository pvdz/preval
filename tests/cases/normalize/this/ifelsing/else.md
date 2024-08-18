# Preval test case

# else.md

> Normalize > This > Ifelsing > Else
>
> Test various ways in which `this` can occur

## Input

`````js filename=intro
const a = {
  foo: 10,
  f: function f() {
    if ($(0)) {
      $('fail');
    } else {
      return this.foo;
    }
  }
};
$(a.f());
`````

## Pre Normal


`````js filename=intro
const a = {
  foo: 10,
  f: function f() {
    const tmpPrevalAliasThis = this;
    debugger;
    if ($(0)) {
      $(`fail`);
    } else {
      return tmpPrevalAliasThis.foo;
    }
  },
};
$(a.f());
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = 10;
const f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const tmpIfTest = $(0);
  if (tmpIfTest) {
    $(`fail`);
    return undefined;
  } else {
    const tmpReturnArg = tmpPrevalAliasThis.foo;
    return tmpReturnArg;
  }
};
const tmpObjLitVal$1 = f;
const a = { foo: tmpObjLitVal, f: tmpObjLitVal$1 };
const tmpCallCallee = $;
const tmpCalleeParam = a.f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(`fail`);
} else {
  tmpCalleeParam = 10;
}
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( 0 );
if (b) {
  $( "fail" );
}
else {
  a = 10;
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
