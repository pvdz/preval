# Preval test case

# this.md

> Ifelse > This
>
> Return this

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    if ($(2)) {
      return this;
    }
  }
}
const obj = {f, foo: 10};
$(obj.f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(2);
    if (tmpIfTest$1) {
      const tmpReturnArg = this;
      return tmpReturnArg;
    }
  }
};
const obj = { f: f, foo: 10 };
const tmpCallCallee = $;
const tmpCalleeParam = obj.f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(2);
    if (tmpIfTest$1) {
      const tmpReturnArg = this;
      return tmpReturnArg;
    }
  }
};
const obj = { f: f, foo: 10 };
const tmpCalleeParam = obj.f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { f: '"<function>"', foo: '10' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
