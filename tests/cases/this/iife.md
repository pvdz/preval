# Preval test case

# iife.md

> This > Iife
>
> From the React header

#TODO

## Input

`````js filename=intro
const f = function () {
  let t = $(1);
  if (t) { t = $(2); }
  if (t) {
    const g = this;
  }
}
f();
`````

## Normalized

`````js filename=intro
const f = function () {
  let t = $(1);
  if (t) {
    t = $(2);
    if (t) {
      const g = this;
    }
  }
};
f();
`````

## Output

`````js filename=intro
const f = function () {
  const t = $(1);
  if (t) {
    $(2);
  }
};
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
