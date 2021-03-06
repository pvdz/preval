# Preval test case

# else.md

> Normalize > This > Ifelsing > Else
>
> Test various ways in which `this` can occur

#TODO

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

## Normalized

`````js filename=intro
const tmpObjLitVal = 10;
const tmpObjLitVal$1 = function f() {
  const tmpPrevalAliasThis = this;
  const tmpIfTest = $(0);
  if (tmpIfTest) {
    $('fail');
  } else {
    const tmpCompObj = tmpPrevalAliasThis;
    const tmpReturnArg = tmpCompObj.foo;
    return tmpReturnArg;
  }
};
const a = { foo: tmpObjLitVal, f: tmpObjLitVal$1 };
const tmpCallCallee = $;
const tmpCalleeParam = a.f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = function f() {
  const tmpPrevalAliasThis = this;
  const tmpIfTest = $(0);
  if (tmpIfTest) {
    $('fail');
  } else {
    const tmpReturnArg = tmpPrevalAliasThis.foo;
    return tmpReturnArg;
  }
};
const a = { foo: 10, f: tmpObjLitVal$1 };
const tmpCalleeParam = a.f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
