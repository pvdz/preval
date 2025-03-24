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
let a___5__ = `abc`;
let b___9__ = `def`;
if ($) {
  /*14*/ let c___20__ = 1;
  const d___23__ = $(`x`);
  const tmpIfTest___29__ = d___31__.length___32__;
  if (tmpIfTest___34__) {
    /*35*/ b___43__ = a___40__.slice___41__(1);
  } /*44*/ else {
    b___48__ = a___47__;
  }
  const h___50__ = b___52__.length___53__;
  $(h___57__);
} /*58*/ else {
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
a:
  - w @5       | ########## | 40,47       | none           | none
  - r @40      | 5
  - r @47      | 5

b:
  - w @9       | ########## | not read    | none           | 43,48
  - w @43      | ########## | 52          | 9              | none
  - w @48      | ########## | 52          | 9              | none
  - r @52      | 43,48

c:
  - w @20      | ########## | not read    | none           | none

d:
  - w @23      | ########## | 31          | none           | none
  - r @31      | 23

tmpIfTest:
  - w @29      | ########## | 34          | none           | none
  - r @34      | 29

h:
  - w @50      | ########## | 57          | none           | none
  - r @57      | 50
