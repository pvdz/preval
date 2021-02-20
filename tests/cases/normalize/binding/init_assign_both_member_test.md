# Preval test case

# init_assign_both_member_test.md

> Normalize > Binding > Init assign both member test
>
> Should normalize assignment init to separate line

Confirm the getter/setter is called the same number of times after normalization.

#TODO

## Input

`````js filename=intro
var b = {get x(){ $(1); return 10; }, set x(n) { $(2, n); }};
var c = {get x(){ $(3); return 20; }, set x(n) { $(4, n); }};
var a = b.x = c.x;
$(5, a);
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
b = {
  get x() {
    $(1);
    return 10;
  },
  set x(n) {
    $(2, n);
  },
};
c = {
  get x() {
    $(3);
    return 20;
  },
  set x(n$1) {
    $(4, n$1);
  },
};
const tmpNestedAssignPropRhs = c.x;
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
b.x = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
$(5, a);
`````

## Output

`````js filename=intro
const b = {
  get x() {
    $(1);
    return 10;
  },
  set x(n) {
    $(2, n);
  },
};
const c = {
  get x() {
    $(3);
    return 20;
  },
  set x(n$1) {
    $(4, n$1);
  },
};
const tmpNestedAssignPropRhs = c.x;
b.x = tmpNestedAssignPropRhs;
$(5, tmpNestedAssignPropRhs);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 2, 20
 - 3: 5, 20
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
