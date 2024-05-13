# Preval test case

# invisible_string.md

> Ref tracking > Done > If-pure > Invisible string
>
> Both strings should be replaced with an empty string (or a custom string indicating they can't be observed)

## Options

- refTest

## Input

`````js filename=intro
let a = "abc";
let b = "def"; // never observed, overwritten in both branches in the loop
if ($) {
  let c = 1;
  const d = $( "x" );
  if (d.length) {
    b = a.slice( 1 );
  }
  else {
    b = a;
  }
  const h = b.length;
  $(h)
}
`````

## Output

(Annotated with pids)

`````filename=intro
let a___4__ = `abc`;
let b___9__ = `def`;
if ($) {
  /*14*/ let c___17__ = 1;
  const d___21__ = $(`x`);
  const tmpIfTest___28__ = d___30__.length___31__;
  if (tmpIfTest___33__) {
    /*34*/ b___42__ = a___39__.slice___40__(1);
  } /*43*/ else {
    b___47__ = a___46__;
  }
  const h___50__ = b___52__.length___53__;
  $(h___57__);
} /*58*/ else {
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
a:
  - w @4       | ########## | 39,46       | none           | none
  - r @39      | 4
  - r @46      | 4

b:
  - w @9       | ########## | not read    | none           | 42,47
  - w @42      | ########## | 52          | 9              | none
  - w @47      | ########## | 52          | 9              | none
  - r @52      | 42,47

c:
  - w @17      | ########## | not read    | none           | none

d:
  - w @21      | ########## | 30          | none           | none
  - r @30      | 21

tmpIfTest:
  - w @28      | ########## | 33          | none           | none
  - r @33      | 28

h:
  - w @50      | ########## | 57          | none           | none
  - r @57      | 50
