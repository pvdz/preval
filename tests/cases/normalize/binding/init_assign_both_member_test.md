# Preval test case

# init_assign.md

> normalize > binding > init_assign
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
var b;
var c;
var a;
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
  set x(n_1) {
    $(4, n_1);
  },
};
let tmpBindInitMemberObject = b;
let tmpBindInitRhs = c.x;
tmpBindInitMemberObject.x = tmpBindInitRhs;
a = tmpBindInitRhs;
$(5, a);
`````

## Output

`````js filename=intro
var b;
var c;
var a;
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
  set x(n_1) {
    $(4, n_1);
  },
};
let tmpBindInitMemberObject = b;
let tmpBindInitRhs = c.x;
tmpBindInitMemberObject.x = tmpBindInitRhs;
a = tmpBindInitRhs;
$(5, a);
`````