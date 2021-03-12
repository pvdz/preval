# Preval test case

# _base_with_tail.md

> Normalize > Branching > Single branching > Base with tail
>
> I'm not sure yet but I think we need to split this example such that the tail becomes its own function and both branches call into it.

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    $(2);
  } else {
    $(3);
  }
  return $(3); // This should be abstracted?
}
$(f(), 'final');
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(2);
  } else {
    $(3);
  }
  const tmpReturnArg = $(3);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = 'final';
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(2);
  } else {
    $(3);
  }
  const tmpReturnArg = $(3);
  return tmpReturnArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam, 'final');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 3, 'final'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
