# Preval test case

# if.md

> Normalize > This > Ifelsing > If
>
> Test various ways in which `this` can occur

## Input

`````js filename=intro
const a = {
  foo: 10,
  f: function f() {
    if ($(1)) {
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
    if ($(1)) {
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
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpReturnArg = tmpPrevalAliasThis.foo;
    return tmpReturnArg;
  } else {
    return undefined;
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
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(10);
} else {
  $(undefined);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 10 );
}
else {
  $( undefined );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
