# Preval test case

# for_of_regression_ref.md

> Ref tracking > Done > Forof > For of regression ref
>
> This was breaking because the for-body was always considered to loop.
> This is true for the while(true) case but not for-in/of.

## Options

- refTest

## Input

`````js filename=intro
$(undefined);
let x = undefined;
const list = [100];
let arr = undefined;
for (arr of list) {
  x = arr;
  $(x, `for`);
}
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
$(undefined___5__);
let x___8__ = undefined___9__;
const list___12__ = [100];
let arr___17__ = undefined___18__;
for (arr___20__ of list___21__) /*22*/ {
  x___26__ = arr___25__;
  $(x___30__, `for`);
}
$(x___36__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @8       | ########## | not read    | none           | 26
  - w @26      | ########## | 30,36       | 8,26           | 26
  - r @30      | 26
  - r @36      | 26

list:
  - w @12      | ########## | 21          | none           | none
  - r @21      | 12

arr:
  - w @17      | ########## | not read    | none           | 20
  - w @20      | ########## | 25          | 17             | none
  - r @25      | 20
