# Preval test case

# inline_remainder-if2.md

> Normalize > Return > Inline remainder-if2
>
> If one branch returns early the remainder of the parent block should be inlined after the other branch.

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    $(2);
    return $(3);
  }
  $(4);
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(2);
    const tmpReturnArg = $(3);
    return tmpReturnArg;
  } else {
    $(4);
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(2);
    const tmpReturnArg = $(3);
    return tmpReturnArg;
  } else {
    $(4);
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
