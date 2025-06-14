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
let /*___5__*/ a = `abc`;
let /*___9__*/ b = `def`;
if ($) {
  /*14~65*/ let /*___20__*/ c = 1;
  const /*___23__*/ d = $(`x`);
  const /*___29__*/ tmpIfTest = /*___31__*/ d./*___32__*/ length;
  if (/*___34__*/ tmpIfTest) {
    /*35~51*/ const /*___38__*/ tmpMCF = /*___40__*/ a./*___41__*/ slice;
    /*___51__*/ b = /*___45__*/ $dotCall(/*___46__*/ tmpMCF, /*___47__*/ a, `slice`, 1);
  } /*52~56*/ else {
    /*___56__*/ b = /*___55__*/ a;
  }
  const /*___58__*/ h = /*___60__*/ b./*___61__*/ length;
  $(/*___65__*/ h);
} /*66~66*/ else {
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
a:
  - w @5       | ########## | 40,47,55    | none           | none
  - r @40      | 5
  - r @47      | 5
  - r @55      | 5

b:
  - w @9       | ########## | not read    | none           | 51,56
  - w @51      | ########## | 60          | 9              | none
  - w @56      | ########## | 60          | 9              | none
  - r @60      | 51,56

c:
  - w @20      | ########## | not read    | none           | none

d:
  - w @23      | ########## | 31          | none           | none
  - r @31      | 23

tmpIfTest:
  - w @29      | ########## | 34          | none           | none
  - r @34      | 29

tmpMCF:
  - w @38      | ########## | 46          | none           | none
  - r @46      | 38

h:
  - w @58      | ########## | 65          | none           | none
  - r @65      | 58
